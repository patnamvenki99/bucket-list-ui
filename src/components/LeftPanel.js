import BucketList from "./BucketList";

export default function LeftPanel(props){
    return (
        <div className="left-panel">
            <input className="new-input" placeholder="Add new list + Enter" onKeyDown={props.createNewBucketList}/>
            { props.bucketList.map( b => <BucketList selectedBucketListId={props.selectedBucketListId} 
                                                     key={b.id} 
                                                     listData={b} 
                                                     onClickBucketList={ props.onClickBucketList } 
                                                     onChangeBucketList= {props.onChangeBucketList}
                                                     onChangeDueby={props.onChangeDueby}
                                                     toggleListDone={props.toggleListDone}
                                                     deleteList={props.deleteList}/>) }
        </div>
    );
} 

