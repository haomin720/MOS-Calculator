function calculateIV() {
	const years = document.getElementById("noy").value*1;
	const ae = document.getElementById("ae").value*1;
	const fcfBegin = document.getElementById("fcfps_fy").value*1;
	const fcfEnd = document.getElementById("fcfps_ly").value*1;
	const gcf = document.getElementById("gcf").value*1;
	const dr = document.getElementById("dr").value*1;
	const igr = document.getElementById("igr").value*1;

	// Calculate compond annul growth rate. CAGR (annual growth rate) = [(last number / first number) ^1/years]-1
	let cagr;
	if (ae > 0) {
		cagr = ae * gcf;
	} else {
		cagr = (Math.pow(fcfEnd/fcfBegin, 1/years) - 1) * gcf;
	}

	document.getElementById("cagr").innerHTML = cagr;

	// Esitmate future FCF
	let futureFCFs = [];
	const mult = 1 + cagr;
	for (let i = 0; i < years; i++) {
		if (i == 0) {
			futureFCFs.push(fcfEnd*mult);
		} else {
			futureFCFs.push(futureFCFs[i-1]*mult);
		}
	}

	console.log(futureFCFs);

	// Discount cash flow to present Discounted cash flows = (CF1/DR¹) + (CF2/DR²) + (CF3/DR³) + (CF4/DR⁴) + (CF5/DR⁵)
	const discountMult = 1 + dr;
	let dcf = 0;
	for (let i = 0; i < years; i++) {
		dcf += futureFCFs[i]/Math.pow(discountMult, i+1);
	}

	document.getElementById("pv").innerHTML = dcf;

	// Calculate terminal value
	const igr_mult = 1 + igr;
	const tv = futureFCFs[years - 1] * igr_mult /(dr - igr);
	const tpv = tv / (Math.pow(discountMult, years - 1))

	document.getElementById("tv").innerHTML = tv;
	document.getElementById("tpv").innerHTML = tpv;

	// Calculate intrisic value
	const iv = tpv + dcf;
	document.getElementById("iv").innerHTML = iv;
}
