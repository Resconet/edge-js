var {http} = require('follow-redirects');

try_get();

function try_get() {
	let url = 'http://nodejs.org/dist/index.json';

	http.get(url,(res) => {
		let body = "";

		if (res.statusCode !== 200) {
			throw new Error(`Unable to get Node.js versions from ${url}`);
		}
	
		res.on("data", (chunk) => {
			body += chunk;
		});
	
		res.on("end", () => {
			try {
				let json = JSON.parse(body);

				for (const el of json.sort()) {
					let version = el.version.substring(1, el.version.length) ;
					if(version.startsWith(process.argv[2])){
						console.log(version)
						return version;
					}
				}
			} catch (error) {
				throw error;
			};
		});
	
	}).on("error", (error) => {
		throw new Error(error);
	});
}
