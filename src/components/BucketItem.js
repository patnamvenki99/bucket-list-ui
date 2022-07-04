import deleteimg from "../images/delete.svg";
import doneimg from "../images/done.svg";
import pendingimg from "../images/pending.svg";

export default function BucketItem(props){
    return (
        <div className="bucket-item">
            <input className={props.itemData.done ? "bi-input-done":"bi-input"} 
                   type="text" value={props.itemData.item} 
                   onChange={props.changeBucketItem(props.itemData.id)}/>
            <img src={props.itemData.done ? pendingimg : doneimg} 
                 onClick={props.toggleItemDone(props.itemData.id)} 
                 title={props.itemData.done ? "Mark as pending":"Mark as complete"}/>
            <img src={deleteimg}  
                 onClick={props.deleteItem(props.itemData.id)} 
                 title="Delete"/>
        </div>
    );
}