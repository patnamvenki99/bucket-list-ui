import React from "react";
import LeftPanel from "./components/LeftPanel"
import RightPanel from "./components/RightPanel"
import "./style.scss"
import data from './data.json';

function App() {
  console.log("App reloads")

  const [bucketListData, setBucketListData]=React.useState(()=>getData() || []);
  const [selectedBucketListId, setSelectedBucketListId]=React.useState((bucketListData && bucketListData.length >0 && bucketListData[0].id) || ""); 

  React.useEffect(() => {
    getDataApi();
  }, []);

  function getData(){
    getDataApi().then(res => {
                                setBucketListData(res)
                                setSelectedBucketListId((res && res.length >0 && res[0].id) || "")
                              })
                .catch(console.log("Not able to fetch api"))
  }

  async function getDataApi(){
    const response=await fetch("http://localhost:9000/bucketlist/getallbucketlists")
    if(response.ok){
      return response.json()
    }else{
      console.log("Issue while fetching data from DB......")
      return []
    }
  }

  
  async function saveStateApi(){
    const response=await fetch("http://localhost:9000/bucketlist/savebucketlists", {
      method:"PUT",
      headers:{"content-type":"application/json"},
      body:JSON.stringify(bucketListData)
    })
    if(response.ok){
      alert("Saved succesfully")
    }else{
      console.log("Issue while saving data to DB......")
      alert("Issue with backend, autosaved in local storage...")
    }
  }

  function saveData(e){
    saveStateApi().catch(alert("Issue with backend, autosaved in local storage..."))
  }

  function changeBucketItem(itemId){
    return (e) => {
      console.log(`Changing BucketItem ${selectedBucketListId} ${itemId}`)
        const newBucketListdata=bucketListData.map(b => {
          if(b.id === selectedBucketListId){
              b.bucketItems=b.bucketItems.map(bi => bi.id === itemId ? { ...bi,  item: e.target.value }:bi)
          }
          return b
        })
        console.log(newBucketListdata)
        setBucketListData(newBucketListdata)        
      }
  }

  function getBucketItems(){
    if (bucketListData &&  bucketListData.length >0 && selectedBucketListId){
      let tempBucketList=bucketListData.find(b => b.id===selectedBucketListId)
      if(tempBucketList)
        return tempBucketList.bucketItems
    }
    return []
  }

  function onClickBucketList(bucketListId){
    return () => {
      console.log(bucketListId)
      setSelectedBucketListId(bucketListId)
    }
  }

  function onChangeBucketList(bucketListId){
    return (e) => {
        const newBucketListdata=bucketListData.map(b => bucketListId === b.id ? {...b, name: e.target.value}: b)
        setBucketListData(newBucketListdata)        
      }
  }

  function onChangeDueby(bucketListId){
    return (e) => {
        const newBucketListdata=bucketListData.map(b => bucketListId === b.id ? {...b, dueby: e.target.value}: b)
        setBucketListData(newBucketListdata)        
      }
  }

  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  
  function formatDate(date) {
    return [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-');
  }

  function createNewBucketList(e){
    let currentDate=new Date();
    let dueby=new Date();
    dueby.setFullYear(currentDate.getFullYear() + 1)
    if (e.key === 'Enter' && e.target.value!=="") {
      const tempId=crypto.randomUUID()
      bucketListData.push({id:tempId, name:e.target.value, done:false, createdOn:formatDate(currentDate), dueby: formatDate(dueby), bucketItems:[]})
      setSelectedBucketListId(tempId)
      e.target.value=""
      setBucketListData(bucketListData)
    }
  }

  function createNewBucketItem(e){
    if (e.key === 'Enter' &&  e.target.value!=="") {
      const newBucketListdata=bucketListData.map(b => {
        if(b.id === selectedBucketListId){
            b.bucketItems.push({
              "id": crypto.randomUUID(),
              "item": e.target.value,
              "done": false
          })
        }
        return b
      })
      e.target.value=""
      setBucketListData(newBucketListdata)
    }
  }

  function toggleItemDone(itemId){
    return () => {
      console.log(`toggle ${itemId}`)
      const newBucketListdata=bucketListData.map(b => {
        if(b.id === selectedBucketListId){
            b.bucketItems = b.bucketItems.map(bi => bi.id === itemId?{...bi, done : !bi.done}:bi)
            b.done=b.bucketItems.every(b => b.done)
          }
          return b
      })
      setBucketListData(newBucketListdata)
    }
  }

  function deleteItem(itemId){
    return () => {
      const newBucketListdata=bucketListData.map(b => {
        if(b.id === selectedBucketListId)
            b.bucketItems = b.bucketItems.filter(bi => bi.id !== itemId)
        return b
      })
      setBucketListData(newBucketListdata)
    }
  }

  function toggleListDone(listId){
    return () => {
      console.log(`toggle ${listId}`)
      const newBucketListdata=bucketListData.map(b => {
        if(b.id === listId){
            b.done = !b.done          
            b.bucketItems = b.bucketItems.map(bi => {return {...bi, done : b.done}})
        }
        return b
      })
      setBucketListData(newBucketListdata)
    }
  }

  function deleteList(listId){
    return () => {
      const newBucketListdata=bucketListData.filter(b => b.id !== listId)
      if(newBucketListdata && newBucketListdata.length >0 && !selectedBucketListId in bucketListData.map(b=>b.id))
        setSelectedBucketListId(newBucketListdata[0].id)
      setBucketListData(newBucketListdata)
    }
  }


  React.useEffect(() => {
      console.log("updating local state")
      console.log(bucketListData)
      localStorage.setItem("bucketListData", JSON.stringify(bucketListData))
  }, [ bucketListData])
  
  return (
    <div className="App">
      <h2 className="header">My Bucket List</h2>
      <main>
        <LeftPanel bucketList={bucketListData} 
                  onClickBucketList={onClickBucketList} 
                  onChangeBucketList={onChangeBucketList}
                  onChangeDueby={onChangeDueby}
                  createNewBucketList={createNewBucketList}
                  selectedBucketListId={selectedBucketListId}
                  toggleListDone={toggleListDone}
                  deleteList={deleteList}/>
        <RightPanel bucketItems={getBucketItems()} 
                    changeBucketItem={changeBucketItem} 
                    createNewBucketItem={createNewBucketItem}
                    toggleItemDone={toggleItemDone}
                    deleteItem={deleteItem}/>
      </main>
      <button className="save-updates" onClick={saveData}>Save Updates</button>
    </div>
  );
}

export default App;
