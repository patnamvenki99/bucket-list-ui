import deleteimg from "../images/delete.svg";
import doneimg from "../images/done.svg";
import pendingimg from "../images/pending.svg";

export default function BucketList(props){
    let input_class=["bucket-list"]
    if(props.listData.done)
        input_class.push("bucket-list-done")
    if(props.selectedBucketListId===props.listData.id)
        input_class.push("bucket-list-selected")
    
    return (
        <div className={input_class.join(" ")} onClick={props.onClickBucketList(props.listData.id)}>
            <p className="dueby">Due on <input  value={props.listData.dueby} onChange={props.onChangeDueby(props.listData.id)}/></p>
            <input className="bl-input" 
                   type="text" 
                   value={props.listData.name} 
                   onChange={props.onChangeBucketList(props.listData.id)}
                   />
            <img src={props.listData.done ? pendingimg : doneimg} 
                 onClick={props.toggleListDone(props.listData.id)} 
                 title={props.listData.done ? "Mark as pending":"Mark as complete"}/>
            <img src={deleteimg}  onClick={props.deleteList(props.listData.id)}  title="Delete"/>
            <p className="createdOn">Created on {props.listData.createdOn}</p>
        </div>
    );
}