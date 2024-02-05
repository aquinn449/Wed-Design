    function validate_name() { 
        document.getElementById("addBtn").addEventListener("click", (e) => {
        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;

            let regx = /^[a-zA-Z\-]{1,32}$/;

            let reg_email = /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/;

            let name_valid = regx.test(name);
            let email_valid = reg_email.test(email);

            if(!name_valid || !email_valid){
                alert("Your name or email was invaild")
            }else{
                alert("Your have signed up for the mailing list")
            }

            // The vaildation works, however you have to click the sign up button before entering the data 
            // to trigger the vaildate function, and I wasn't sure how to fix this  

    });
    }
 
    window.onload = () => {

        // the POST and GET functions were attempted but the mudfoot mailing list didnt seem to hold any data
        // therefore couldn't GET the names and emails because it wasn't storing them 

        // getMailingData(); 
    
    
        document.getElementById("addBtn").addEventListener("click", (e) => {
            let Name = document.getElementById("Name").value;
            let Email = document.getElementById("Email").value;
    
            const url = "mudfoot.doc.stu.mmu.ac.uk/node/api/mailinglist";
            const data = {
                "Name": Name,
                "Email": Email
            };
    
            fetch(url, {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                .then((response) => {
                    if (response.status === 201) {
                        return response.json();
                    } else if (response.status === 400) {
                        throw "Bad data was sent to the server";
                    } else {
                        throw "Something went wrong";
                    }
                })
                .then((resJson) => {
                    document.getElementById("formResponse").innerHTML = resJson["Name"] + " has joined the mailing list";
                    document.getElementById("formResponse").classList = "success";
                    getMovieData();
                })
                .catch((error) => {
                    document.getElementById("formResponse").innerHTML = error;
                    document.getElementById("formResponse").classList = "error";
                })
    
        });
    
    }

    const getMailingData = () => {
        const url = "mudfoot.doc.stu.mmu.ac.uk/node/api/mailinglist";

        fetch(url, {
            method: "get", 
        })
        .then((resJson) => {
            let = tableHTML = "";
    
            for(let i = 0; i < resJson.length; i++){
                tableHTML += "<tr>";
                tableHTML += "<td>" + resJson[i]["name"] + "</td>";
                tableHTML += "<td>" + resJson[i]["email"] + "</td>";
                tableHTML += "</tr>";
            };
    
            document.getElementById("Mailing-List-Table").innerHTML = tableHTML;
        })
        .catch((error) => {
            alert(error);
        })
    }
    



