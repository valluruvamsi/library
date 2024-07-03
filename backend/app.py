from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from flask_cors import CORS

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/library"
mongo = PyMongo(app)
CORS(app)


@app.route('/books', methods=['GET'])
def get_books():
    books = mongo.db.books.find()
    result = []
    for book in books:
        result.append({'_id': str(book['_id']), 'title': book['title'], 'author': book['author']})
    return jsonify(result)

@app.route('/books/<id>', methods=['GET'])
def get_book(id):
    book = mongo.db.books.find_one({'_id': ObjectId(id)})
    if book:
        return jsonify({'_id': str(book['_id']), 'title': book['title'], 'author': book['author']})
    return jsonify({'error': 'Book not found'}), 404

@app.route('/books', methods=['POST'])
def add_book():
    data = request.json
    print(f"Received data: {data}")
    book_id = mongo.db.books.insert_one(data).inserted_id
    return jsonify({'_id': str(book_id)}), 201

@app.route('/books/<id>', methods=['PUT'])
def update_book(id):
    data = request.json
    print(f"Updating book with ID: {id}, Data: {data}")
    mongo.db.books.update_one({'_id': ObjectId(id)}, {'$set': data})
    return jsonify({'msg': 'Book updated'}), 200

@app.route('/books/<id>', methods=['DELETE'])
def delete_book(id):
    print(f"Deleting book with ID: {id}")
    mongo.db.books.delete_one({'_id': ObjectId(id)})
    return jsonify({'msg': 'Book deleted'}), 200

if __name__ == '__main__':
    app.run(debug=True)
