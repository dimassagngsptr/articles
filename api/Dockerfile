FROM golang:1.22-alpine AS builder

WORKDIR /app

RUN apk update && apk add --no-cache git && \
    go install github.com/cosmtrek/air@latest

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN go build -o /go-api

FROM alpine:3.18

COPY --from=builder /go-api /go-api
COPY --from=builder /go/bin/air /bin/air
COPY .env .

EXPOSE 3000

COPY air.sh /app/air.sh
RUN chmod +x /app/air.sh


CMD ["/app/air.sh"]
