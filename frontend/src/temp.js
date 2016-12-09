//Variable Helper functions
var primes =[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71]
function prime() {
	return primes[Math.floor(Math.random()*primes.length)]
}

function prime(bound) {
	if(bound==undefined) bound = primes.length
	return primes[Math.floor(Math.random()*bound)]
	
}


function int(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function mat(x,y, fun) {
	
	var mat=[];
	
	for(i=0;i<x; i++) {
		var arr=[];
		for(j=0; j<y;j++) {
			
			arr.push(fun())
		}
		mat.push(arr)
	}
	
	return mat;
}

function gcd(a, b) {
    if ( ! b) {
        return a;
    }

    return gcd(b, a % b);
};



function dif(fun) {
	
	var numbers= []
	for(var i=1; i<arguments.length;i++) {
		numbers.push(arguments[i])
	}
	var newNr = fun()
	while(true) {
		
		var flag= true
		for(var i=0; i<numbers.length;i++) {
			if(numbers[i]==newNr) {
				flag=false;
				break;
			}
		}
		if(flag) break
		newNr= fun()
	}
	return newNr
}

//Mathjax helper functions

function bmatrix(variables) {
	
	var res="";
	res+="\\begin{bmatrix}"
	for(var i=0; i<variables.length;i++) {
		for(var j=0; j<variables[i].length;j++) {
			res+=variables[i][j]+" "
			if(j!=variables[i].length-1)res+="\&"
		}
		if(i!=variables.length-1) res+="\\\\"
	}
	res+="\\end{bmatrix}"
	console.log(res)
	return res
}
