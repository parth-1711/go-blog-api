package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Comment struct {
	ID      primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	BlogID  primitive.ObjectID `bson:"blog_id" json:"blog_id"`
	Content string             `bson:"content" json:"content"`
	Author  string             `bson:"author" json:"author"`
}
