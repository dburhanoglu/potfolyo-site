const BASE_URL = "https://6d67ebe4-81d8-4a92-a018-8beac3186173.mock.pstmn.io/";
const USER_INFO_URL = "user-info";
const EDUCATION_INFO_URL = "education-info";

async function getPortfolioData(id) {
  try {
    await fetch(BASE_URL + EDUCATION_INFO_URL + "?id=" + id)
      .then((res) => res.json())
      .then((d) => {
        if (d?.educations) {
          console.log("eğitim verisi alındı.", d?.educations);
          listCreate(d?.educations);
        }
      });
  } catch (errors) {
    console.error(errors);
  }
}

function listCreate(educationsData) {
  if (educationsData.length > 0) {
    var achievementListObject = document.getElementById("achievement-list");
    educationsData.forEach((element) => {
      let listObject = document.createElement("li");
      listObject.appendChild(document.createTextNode(element?.name));
      achievementListObject.appendChild(listObject);
    });
  }
}

getPortfolioData("b8368715-a00e-4738-b12a-7821481e6fb1");

async function getUserName(id) {
  try {
    await fetch(BASE_URL + USER_INFO_URL + "?id=" + id)
      .then((res) => res.json())
      .then((d) => {
        if (d?.user) {
          console.log("kullanıcı verisi alındı");
          setUserInfo(d?.user[0]);//0.kullanıcının bilgisini verir(tüm bilgisini edu da dahil)
        }
      });
  } catch (errors) {
    console.error(errors);
  }
}

function setUserInfo(userData) {//userdata varsa
  if (userData) {
    setNameText(userData);//nametexte userdatayı yerleştir
    setWorkTypeText(userData.workType);
    setAboutMeInsideText(userData.aboutMe);//about me kısmının içine json bilgiyi yerleştir
    addGithubAElement(userData.github);
    addEmailAElement(userData.email);
  }
}

function setNameText(userData) {
  var nameSurnameObject = document.getElementById("name-surname");//id si namesurname olan yere 
  nameSurnameObject.textContent = userData.firstName + " " + userData.lastName;//metin içeriğini bu yap

  var copyrightNameSurnameObject = document.getElementById(// copy right  objesine ismim eklendi aynı şekilde
    "copyright-name-surname"
  );
  copyrightNameSurnameObject.textContent =
    userData.firstName + " " + userData.lastName;
}

function setWorkTypeText(workType) {
  var workTypeObject = document.getElementById("work-type");
  workTypeObject.textContent = workType;
}

function setAboutMeInsideText(aboutMe) {
  var aboutMeObject = document.getElementById("about-me-inside-text");
  aboutMeObject.textContent = aboutMe;
}

function addGithubAElement(githubText) {
 
  let linkItem = document.createElement("a");
  linkItem.appendChild(document.createTextNode("GitHub➲"));
  linkItem.style.textDecoration = "none";
  linkItem.className = "link-color";
  linkItem.href = githubText;

  // <a> öğesini eklemek istediğiniz yerin referansını alın ve içine ekleyin
  var gitHubLinkObject = document.getElementById("github-link");
  gitHubLinkObject.innerHTML = ''; // Önceden içeriği temizle
  gitHubLinkObject.appendChild(linkItem);
}

function addEmailAElement(emailText) {
  var sendEmailObject = document.getElementById("send-email");
  let linkItem = document.createElement("a");
  linkItem.href = "mailto:" + emailText;
  linkItem.style.textDecoration = "none";
  linkItem.className = "link-color";
  
  let textToLink = document.createTextNode("Send e-mail➲");
  linkItem.appendChild(textToLink);
  
  sendEmailObject.innerHTML = ''; // Önceki içeriği temizle
  sendEmailObject.appendChild(linkItem);
}

getUserName("c32d8b45-92fe-44f6-8b61-42c2107dfe87");

function create_UUID() {
  var dt = new Date().getTime();
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
}

console.log("created uuid: ", create_UUID());
