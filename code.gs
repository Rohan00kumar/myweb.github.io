var driver = new DRIVER("https://script.google.com/macros/s/AKfycbyihnBnr4w0arSOwZ-cRu3DjzyH7ESotvzOdlouvAxIEo9rx3xltqNmTDiqbx1Rlq_n3Q/exec", "2b7b59b169085f9ce798a181b7446fe64ed7b77f542fb66559e0aa2d168880e")
function include(fileName) {
  return HtmlService.createHtmlOutputFromFile(fileName).getContent();
}
function doGet(event) {
  return HtmlService.createTemplateFromFile('index').evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);;
}
// data.getContentText()
// dont touch code above it





function makeLogin(username,password){
  data = driver.Search("userTable","name",username)
  data = JSON.parse(data.getContentText())
  if(data["Error_code"] == undefined){
      if(data["Output"][0]["password"]== password){
          return 0;
      }else{
        return -1;
      }
 
  }else{
    return -2;
  }
}
function getPerfectID(tableName,colName){
  while(true){
    id = makeid()
    data = (driver.Search(tableName,colName,id).getContentText())
    
    if(data["Error_code"] == undefined){
      break
    }
  }
  return id
  // data = driver.Search("")
}

// dont use this function
function addCourse(couseName,bid,sid){
  id = getPerfectID("couseTable","id")
  temp = driver.Insert("couseTable",{
    "id":id,
    "cname":couseName,
    "sid":sid,
    "bid": bid
  })
  return temp.getContent()
}

function getCourse(sid){
   data = JSON.parse(driver.Search("couseTable","sid",sid))
  return data["Output"]
}

function addBranch(branchName){
  id = getPerfectID("branchTable","id")
  driver.Insert("branchTable",{
    "id":id,
    "bname":branchName,
  })
}

function getAllBranch(){
  data = JSON.parse(driver.FetchAll("branchTable").getContentText())
  return data["Output"]["res"]
}


function addSem(name,bid){
  id = getPerfectID("branchTable","id")
  driver.Insert("semTT",{
    "id":id,
    "bid":bid,
    "name":name
  })
}
function getSem(bid){
  data = JSON.parse(driver.Search("semTT","bid",bid))
  return data["Output"]
}

function addSubject(name,sid){
  id = getPerfectID("couseTable","id")
  driver.Insert("couseTable",{
    "id":id,
    "cname":name,
    "sid":sid  
  })
}
function getSubject(sid){
  data = JSON.parse(driver.Search("couseTable","sid",sid))
  return data["Output"]
}

function addLink(title,link,cid){
  id = getPerfectID("notes","id")
  driver.Insert("notes",{
    "id":id,
    "cid":cid,
    "title":title,
    "link":link  
  })
}
function getLink(cid){
  data = JSON.parse(driver.Search("notes","cid",cid))
  return data["Output"]
}
