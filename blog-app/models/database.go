package models

import (
	"context"
	"os"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"log"
	"time"
)

var DB *mongo.Client
var BlogCollection *mongo.Collection
var UserCollection *mongo.Collection
var CommentCollection *mongo.Collection

func ConnectDatabase() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	MONGO_URI:=os.Getenv("MONGO_URI")
	clientOptions := options.Client().ApplyURI(MONGO_URI)
	client, err := mongo.NewClient(clientOptions)
	if err != nil {
		log.Fatal(err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}

	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatal(err)
	}

	DB = client
	BlogCollection = client.Database("blogApp").Collection("blogs")
	UserCollection = client.Database("blogApp").Collection("users")
	CommentCollection = client.Database("blogApp").Collection("comments")

	log.Println("Connected to MongoDB!")
}
