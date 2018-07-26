'use strict';

angular.module('core.daydreamrestApi', [
    'ngResource'
])
.factory('restService', [
    '$resource',
    function($resource){

        var products = $resource('/api/products', {}, {
            getProductsList:{
                method: 'GET',
                isArray: true,
                url: '/api/v0.1.1/products/getlist'
            },

            postProductsList:{
                method: 'POST',
                url: '/api/v0.1.1/products/insert'
            },

            deleteProductsList:{
                method: 'PUT',
                url: '/api/v0.1.1/products/delete'
            }
            
        });

        var user = $resource('/api/user',{}, {
            getUser:{
                method: 'GET',
                isArray: true,
                url : '/api/v0.1.1/user/getuser'
            },

            putUser:{
                method: 'PUT',
                url : '/api/v0.1.1/user/insertuser'
            }
        })

        return{
            products: products,
            user : user
        };
    }
]);