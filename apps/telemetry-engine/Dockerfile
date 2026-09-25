FROM python:3.12-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Install production server for WebSockets
RUN pip install uvicorn[standard] gunicorn

COPY . .

EXPOSE 8015

# Run Uvicorn directly for WebSockets (Gunicorn + Uvicorn workers can have WebSocket state issues)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8015"]
