#!/bin/bash
cd /home/z/my-project
npx next dev -p 3000 > /home/z/my-project/dev.log 2>&1 &
SERVER_PID=$!

echo "=== Waiting for server ==="
for i in $(seq 1 15); do
  if ss -tlnp | grep -q ":3000 "; then
    echo "Server ready after ${i}s"
    break
  fi
  sleep 1
done

if ! ss -tlnp | grep -q ":3000 "; then
  echo "FAILED: Server did not start"
  cat /home/z/my-project/dev.log
  exit 1
fi

echo ""
echo "=== Test 1: Page loads ==="
HTTP=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:3000/)
echo "Homepage: HTTP $HTTP"

echo ""
echo "=== Test 2: Apple device detection ==="
RESULT1=$(curl -s -X POST http://127.0.0.1:3000/api/detect -H 'Content-Type: application/json' -d '{"brand":"Apple"}')
echo "$RESULT1" | python3 -m json.tool 2>/dev/null | head -30
MODEL1=$(echo "$RESULT1" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d['deviceInfo']['model'])" 2>/dev/null)
echo ">>> Detected: $MODEL1"

echo ""
echo "=== Test 3: Samsung device detection ==="
RESULT2=$(curl -s -X POST http://127.0.0.1:3000/api/detect -H 'Content-Type: application/json' -d '{"brand":"Samsung"}')
echo "$RESULT2" | python3 -m json.tool 2>/dev/null | head -30
MODEL2=$(echo "$RESULT2" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d['deviceInfo']['model'])" 2>/dev/null)
echo ">>> Detected: $MODEL2"

echo ""
echo "=== Test 4: Xiaomi device detection ==="
RESULT3=$(curl -s -X POST http://127.0.0.1:3000/api/detect -H 'Content-Type: application/json' -d '{"brand":"Xiaomi"}')
echo "$RESULT3" | python3 -m json.tool 2>/dev/null | head -30
MODEL3=$(echo "$RESULT3" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d['deviceInfo']['model'])" 2>/dev/null)
echo ">>> Detected: $MODEL3"

echo ""
echo "=== Test 5: Firmware analysis ==="
MODEL_CODE=$(echo "$RESULT1" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d['deviceInfo']['modelCode'])" 2>/dev/null)
RESULT4=$(curl -s -X POST http://127.0.0.1:3000/api/analyze -H 'Content-Type: application/json' -d "{\"brand\":\"Apple\",\"model\":\"$MODEL1\",\"modelCode\":\"$MODEL_CODE\"}")
echo "$RESULT4" | python3 -m json.tool 2>/dev/null | head -20

echo ""
echo "=== Test 6: Second scan should give DIFFERENT device ==="
RESULT5=$(curl -s -X POST http://127.0.0.1:3000/api/detect -H 'Content-Type: application/json' -d '{"brand":"Apple"}')
MODEL5=$(echo "$RESULT5" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d['deviceInfo']['model'])" 2>/dev/null)
echo ">>> First scan: $MODEL1 | Second scan: $MODEL5"
if [ "$MODEL1" != "$MODEL5" ]; then
  echo "✅ PASS: Different devices detected on consecutive scans"
else
  echo "⚠️ Same device detected (may need 3rd scan to cycle)"
fi

echo ""
echo "=== Dev log errors ==="
rg -i "error|fail|crash" /home/z/my-project/dev.log || echo "No errors found"

echo ""
echo "=== All tests complete ==="
kill $SERVER_PID 2>/dev/null