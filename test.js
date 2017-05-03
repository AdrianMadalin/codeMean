// var arr = [1,2,3,4,5];

// var countArray = function(arr){
//     var count = 0;
//       for(var i = 0; i <= arr.length; i++){
//           count += i;
//       };
       
//       console.log(count);
// }

// countArray(arr);

// console.log('medium is');

// var medium = function(arr){
//     var count = 0;
//     for(var i =0; i<= arr.length; i++){
//         count += i;
//     };
    
//     console.log(count / arr.length);
// }

// medium(arr);


// var arr2 = [5,4,3,7];

// var order = function(arr){
//     for(var i=0; i<=arr.length; i++){
//         for(var j=0; j < arr.length - 1; j++){
//                 var temp = j + 1;
//                 var a = arr[j];
//                 var b = arr[temp];
//                 arr[i] = i;
//         }
//     }
//     console.log(arr);
// }


// var order2 = function(arr){
//     var swaped = true;
//     while(swaped){
//         swaped = false;
//         for(var j=0; j<arr.length-1; j++){
//             if(arr[j] > arr[j+1]){
//                 var temp = arr[j+1];
//                 arr[j+1] = arr[j];
//                 arr[j]   = temp;
//                 swaped   = true;
//             }
//         }
//     }
    
//     return arr;
// }

// console.log(order2(arr2));
// // order(arr2);


// var arrayToSort = [9,6,4,3,2];
// var sort = function(arr){
//     var swaped = true;
//     while(swaped){
//         swaped = false;
//         for(var i=0; i < arr.length - 1; i++){
//             if(arr[i] > arr[i+1]){
//                 var temp = arr[i+1];
//                 arr[i+1] = arr[i];
//                 arr[i]   = temp;
//                 swaped   = true;
//             };
//         };
//     };
//     return arr;
// }

// console.log(sort(arrayToSort));

var arrayToSortDesc = [1,3,6,11,5];
var sortDesc = function(arr){
    var swaped = true;
    while(swaped){
        swaped = false;
        for(var i=0; i < arr.length -1; i++){
            if(arr[i] < arr[i+1]){
                var temp = arr[i];
                arr[i]  = arr[i+1];
                arr[i+1] = temp;
                swaped = true;
            };
        };
    };
    return arr;
};

console.log(sortDesc(arrayToSortDesc));