'use strict';

angular.module('core.daydreamrestApi', [
    'ngResource'
])
.factory('restService', [
    '$resource',
    function($resource){

        var products = $resource('/api/products', {}, {
            getProductsListAll:{
                method: 'GET',
                isArray: true,
                url: '/api/v0.1.1/products/getlistAll'
            },
            
            getProductsList:{
                method: 'GET',
                isArray: true,
                url: '/api/v0.1.1/products/getlist'
            },

            getProductsListId:{
                method: 'GET',
                isArray: true,
                url: '/api/v0.1.1/products/getlistid'
            },

            getProductsOption:{
                method: 'GET',
                isArray: true,
                url: '/api/v0.1.1/products/getoptionlist'
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

            getUserId:{
                method: 'GET',
                isArray: true,
                url: '/api/v0.1.1/user/getuserid'
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