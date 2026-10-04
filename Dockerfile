FROM python:3.11-slim

ENV DEBIAN_FRONTEND=noninteractive \
    PYTHONUNBUFFERED=1

RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    ca-certificates && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

RUN pip install --no-cache-dir \
    fastapi>=0.115.0 \
    uvicorn>=0.30.0 \
    websockets>=13.0 \
    pydantic>=2.8.0 \
    openai>=1.54.0 \
    pytest>=8.0.0 \
    flake8>=7.0.0

COPY gpt_live_voice_agent.py .
COPY webrtc_audio_client.js .

CMD ["python3", "gpt_live_voice_agent.py"]
