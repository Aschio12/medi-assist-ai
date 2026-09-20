FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Install gunicorn for production process management
RUN pip install gunicorn uvicorn

COPY . .

EXPOSE 8013

# Run Gunicorn with Uvicorn workers for high concurrency
CMD ["gunicorn", "main:app", "-w", "4", "-k", "uvicorn.workers.UvicornWorker", "--bind", "0.0.0.0:8013", "--access-logfile", "-", "--error-logfile", "-"]
