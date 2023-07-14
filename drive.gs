OPCODE = {
  "insert":0,
  "search":1,
  "update":2,
  "delete": 3,
  "getAllData": 4
}

class APIdriver{
    constructor(url,key){
      this.url = url
      this.key = key
    }
    oprate(opcode,obj){
      var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: {
          'Accept': 'application/json'
        }
      }
      var temp ={
      "opcode": opcode,
      "sheetname": obj.sheetname,
      "data": obj.data,
      "feilds": obj.feilds,
      "pkey": obj.pkey,  /// column name 
      "fkey": obj.fkey
      }
      
      if(temp.feilds == undefined){
        return UrlFetchApp.fetch(`${this.url}?secretkey=${this.key}&opcode=${temp.opcode}&fkey=${temp.fkey}&sheetname=${temp.sheetname}&pkey=${temp.pkey}&data=${temp.data}`,requestOptions)
      }
      return UrlFetchApp.fetch(`${this.url}?secretkey=${this.key}&opcode=${temp.opcode}&fkey=${temp.fkey}&sheetname=${temp.sheetname}&pkey=${temp.pkey}&data=${temp.data}&feilds=${temp.feilds}`,requestOptions)
    }
    jsonTodata(data){
      var temp = Object.keys(data)
      var result = ""
      var flag = 1
      temp.forEach(e=>{
        if(flag){
          result+=`${e}:${data[e]}`
          flag = 0
        }
        else{
          result+=`,${e}:${data[e]}`
        }
        
      })
      return result
    }
   
    arrayTofields(data){
      var flag = 1
      var result = ""
      data.forEach(e=>{
        if(flag){
          result+=`${e}`
          flag = 0
        }
        else{
          result+=`,${e}`
        }
      })
      return result
    }
   
  }
   
   
  class DRIVER{
    constructor(url,key){
      this.driver = new APIdriver(url,key)
    }
    Update(tablename,data,col,val){
      var data = this.driver.jsonTodata(data)
      return this.driver.oprate(OPCODE["update"],{"sheetname":tablename,"data":data,"pkey":col,"fkey":val})
    }
    Insert(tablename,data){
      var data = this.driver.jsonTodata(data)
      return this.driver.oprate(OPCODE["insert"],{"sheetname":tablename,"data":data})
    }
    Search(tablename,col,val,fields=undefined){
      if(fields!=undefined){
        var fields = this.driver.arrayTofields(fields)
      }
      return this.driver.oprate(OPCODE["search"],{"sheetname":tablename,"feilds":fields,"pkey":col,"fkey":val})
    }
    Delete(tablename,col,val){
      return this.driver.oprate(OPCODE["delete"],{"sheetname":tablename,"pkey":col,"fkey":val})
    }
    FetchAll(tablename){
      return this.driver.oprate(OPCODE["getAllData"],{"sheetname":tablename})
    }
  }
  
  