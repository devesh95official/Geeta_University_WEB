//used DOM
const Input = document.querySelector(".input");
const Button = document.querySelector(".button");
const Profile = document.querySelector(".profile");

// API Url
// https://codeforces.com/api/user.info?handles={yourhandle}

Button.addEventListener('click',async ()=>{
    const handle = Input.value;
    const URL = `https://codeforces.com/api/user.info?handles=${handle}`;
    try{
       const Data = await fetch(URL);
       const profile  = await Data.json();
       let fullName = profile.result[0].firstName;
        fullName += " ";
        fullName += profile.result[0].lastName;
       Profile.innerHTML=`
         <div class="user">
                <div> <h3 class="rank">${profile.result[0].rank}</h3>
                <h1>${profile.result[0].handle}</h1>
                <h4>${fullName} </h4>
                <h2 class="rating">${profile.result[0].maxRating}</h2></div>
                <img src="${profile.result[0].titlePhoto}" alt="">
            </div>
        `;
    }
    catch(error){
        console.error("404 not found!");
    }
});
