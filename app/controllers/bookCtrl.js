"use strict";

app.factory("TravelFactory", function($q, $http) {
    const getAllBooks = function(){
        let books = [];
        return $q((resolve, reject) => {
            $http.get(`./data/guides.json`)
            .then((itemObject) => {
                let itemCollection = itemObject.data;
                console.log("itemCollection", itemCollection.guides);
                // angular.forEach(itemCollection, function(value, key) {
                //     books.push(key + ':' + value);
                Object.keys(itemCollection.guides).forEach((key) => {
                    books.push(itemCollection.guides[key]);
                });
                resolve(books);
            })
            .catch((error) =>{
                reject(error);
            });
        });
    };
    return {getAllBooks};
});



app.controller("bookCtrl", function($scope, TravelFactory){
    $scope.books = [];
    const showAllBooks = function(){
        TravelFactory.getAllBooks()
        .then((books) => {
            $scope.books = books;
            console.log("scope", $scope.books);
        });
    };
    showAllBooks();
});