 function isEqual (a,b){
    if ((Object.is(a,0) || Object.is(b,0)) && (Object.is(a,-0) || Object.is(b,-0))){
        return true;
    }else if((Object.is(a,NaN) && Object.is(b,NaN))){
        return false;
    }else {
        return Object.is(a,b);
    }
}
<<<<<<< HEAD
=======
console.log(isEqual(NaN,0/-0));

console.log(isEqual(0,0));

console.log(isEqual(-0,0));

console.log(isEqual(0,-0));

console.log(isEqual(-0,-0));
<<<<<<< HEAD
>>>>>>> origin
=======
>>>>>>> d4f03168a4813a4b4dca66a36d0f7bb079d346fa
>>>>>>> c0b66836e96b9eaed2ef42673972fbd8f77bbb91

let array = [0,0,0,0,0];
console.log(array[-1]);
