import BucketItem from "./BucketItem";

export default function RightPanel(props){
    return (
        <div className="right-panel">
            <input  className="new-input" placeholder="Add new item + Enter" onKeyDown={props.createNewBucketItem}/>
            {props.bucketItems.map( b => <BucketItem key={b.id} itemData={b} changeBucketItem={props.changeBucketItem} deleteItem={props.deleteItem} toggleItemDone={props.toggleItemDone} />)}
        </div>
    );
}