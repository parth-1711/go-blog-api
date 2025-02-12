package models

import (
	"context"
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
	clientOptions := options.Client().ApplyURI("mongodb+srv://parthirache8:z4vzCIhmvjhlg4S2@cluster0.c2hgi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
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
