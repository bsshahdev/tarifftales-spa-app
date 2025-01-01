import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { taskStatus } from './initialData';
import { UncontrolledTooltip } from 'reactstrap';
import AnimatedCounter from './AnimatedCounter';

const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
  
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const [removed] = sourceColumn.splice(source.index, 1);
      destColumn.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: sourceColumn,
        [destination.droppableId]: destColumn
      });
    } else {
      const column = columns[source.droppableId];
      const [removed] = column.splice(source.index, 1);
      column.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: column    
      });
    }
};

export default function MainDnd() {
    const [columns, setColumns] = useState({});
    useEffect(() => {
        setColumns(taskStatus);
    },[])
    return (
        <>
            <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)} >
            {Object.entries(columns).map(([columnId, column], index) => {
                return (
                <div key={columnId} >
                    <Droppable droppableId={columnId} key={columnId}>
                        {(provided, snapshot) => {
                        return (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                            {column.map((item, index) => {
                                return (
                                    <Draggable key={item.id} draggableId={item.id} index={index}>                                       
                                    
                                        {(provided, snapshot) => {
                                        return (
                                            <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}    
                                            className='sh_revenue_summary_wrap'   
                                            style={{filter:item?.id == "shipment" && "blur(3px)"}}                             
                                            >
                                                <h3 className="sub_title" dangerouslySetInnerHTML={{__html:item?.name}} />
                                                {item?.items.map((data) => (
                                                    <div className='sh_summary_box' key={data?.id}>
                                                        <p className='sh_summ_title d-flex align-items-center'>{data?.title} 
                                                        {data?.tooltip_content !== '' && (
                                                            <span className="step-icon ms-1" data-bs-toggle="tooltip" id={`tooltip_${data?.id}`}>
                                                                <i className="mdi mdi-information"></i>
                                                                <UncontrolledTooltip placement="right" target={`tooltip_${data?.id}`}>
                                                                    {data?.tooltip_content}
                                                                </UncontrolledTooltip>
                                                            </span>
                                                        )} 
                                                        </p>
                                                        <div className='sh_sum_rate justify-content-between'>
                                                            <span>
                                                            {item.id === 'revenue_sum' && '₹'}<AnimatedCounter rate={Number(data?.revenue)} />
                                                            </span>
                                                            {/* <span className={`${data?.rate_type === 'down' ? 'red_text' : 'green_text'}`}>{data?.rate}%</span> */}
                                                            <div className="text-nowrap">
                                                                <span className={"badge badge-soft-" + `${data?.rate_type === 'down' ? "danger" : "success"}` + " text-" + `${data?.rate_type === 'down' ? "danger" : "success"}`}>
                                                                {data?.rate}%
                                                                </span>
                                                                <span className="ms-1 box_bottom_text">Since last month</span>
                                                            </div>
                                                        </div>
                                                    </div> 
                                                ))}
                                            </div>
                                        );
                                        }}
                                    </Draggable>
                                );
                            })}
                            {provided.placeholder}
                            </div>
                        );
                        }}
                    </Droppable>
                </div>
                );
            })}
            </DragDropContext>
        </>
    )
}
