export default async function handler(req,res){
            fetch("https://onecompiler.com/api/challenges/reportTabChange/3z7rgczut", {
              "headers": {
                "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIzenQzN3RmMzkiLCJlbWFpbCI6InNuaW9sYXJ0QGdtYWlsLmNvbSIsImlhdCI6MTcwMDEyNjExMH0.Zl8WqzuDab5FVkQhPLejXi6mxUBP6I75rJaojNagoGE",
                "content-type": "application/json",
                "sec-ch-ua": "\"Google Chrome\";v=\"119\", \"Chromium\";v=\"119\", \"Not?A_Brand\";v=\"24\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"macOS\""
              },
              "referrer": "https://onecompiler.com/challenges/3z7rgczut/tcs-nqt-mock-tests-6_2_reasoning_ability",
              "referrerPolicy": "strict-origin-when-cross-origin",
              "body": null,
              "method": "GET",
              "mode": "cors",
              "credentials": "include"
            }).then(val => val.json()).then(i => res.json({status:true}));
}