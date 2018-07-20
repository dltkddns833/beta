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
                url: '/api/v0.1.1/products/new'
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

        return{
            products: products
        };
    }
]);