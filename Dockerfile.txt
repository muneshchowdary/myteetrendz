# Use official lightweight Python image
FROM python3.11-slim

# Set working directory
WORKDIR app

# Install system dependencies (for Pillow, etc.)
RUN apt-get update && apt-get install -y 
    build-essential 
    libpq-dev 
    gcc 
    && rm -rf varlibaptlists

# Copy requirements file if exists (better for caching)
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose Flask port
EXPOSE 5000

# Run the application
CMD [python, app.py]
