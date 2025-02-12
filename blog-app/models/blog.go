package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Blog struct {
	ID       primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Title    string             `bson:"title" json:"title"`
	Content  string             `bson:"content" json:"content"`
	Author   string             `bson:"author" json:"author"`
	Comments []Comment          `bson:"comments,omitempty" json:"comments"`
}
