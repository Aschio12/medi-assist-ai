FROM python:3.12-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Install production server
RUN pip install gunicorn uvicorn

COPY . .

EXPOSE 8014

# Run Gunicorn with Uvicorn workers for high concurrency, 
# ensuring NLP pipelines can handle throughput.
CMD ["gunicorn", "main:app", "-w", "2", "-k", "uvicorn.workers.UvicornWorker", "--bind", "0.0.0.0:8014", "--access-logfile", "-", "--error-logfile", "-"]
