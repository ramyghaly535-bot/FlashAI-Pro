#!/bin/bash
cd /home/z/my-project

# Start server in background
npx next dev -p 3000 > /home/z/my-project/dev.log 2>&1 &
SERVER_PID=$!

# Wait for server to be ready
for i in $(seq 1 15); do
  if ss -tlnp | grep -q ":3000 "; then
    echo "Server ready after ${i}s"
    break
  fi
  sleep 1
done

if ! ss -tlnp | grep -q ":3000 "; then
  echo "Server failed to start"
  cat /home/z/my-project/dev.log
  exit 1
fi

echo "=== Server running on port 3000 ==="

# Test with curl
HTTP_CODE=$(curl -s -o /tmp/page.html -w "%{http_code}" http://127.0.0.1:3000/ 2>&1)
echo "HTTP Status: $HTTP_CODE"
echo "Response size: $(wc -c < /tmp/page.html) bytes"

# Test the page content
head -50 /tmp/page.html

# Check if server survived
sleep 1
if ss -tlnp | grep -q ":3000 "; then
  echo "=== Server survived the request ==="
else
  echo "=== Server died after request ==="
  cat /home/z/my-project/dev.log
fi

# Keep server alive
echo "=== Keeping server alive ==="
wait $SERVER_PID 2>/dev/null