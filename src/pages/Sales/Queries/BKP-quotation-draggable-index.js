import React, { useState } from 'react'
import classnames from "classnames";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Container, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { Edit } from '../../Settings/Roles/RolesCol';
import drag from "../../../assets/images/icons/drag.png";
import man2 from "../../../assets/images/icons/profile.png";
import edit from "../../../assets/images/icons/edit.png";
import open_eye from "../../../assets/images/icons/open-eye.png";
import clock from "../../../assets/images/icons/clock.png";
import { useDispatch, useSelector } from "react-redux";
import { filter_icon } from '../../../assets/images';
import { SEARCH_QUOTATION_BLANK } from '../../../store/Sales/actiontype';
import { QUOTATION_RESULT_SELECTED_BLANK } from '../../../store/InstantRate/actionType';
import { useNavigate } from 'react-router-dom';

const initialItems = {
  list1: [
    { id: '1', content: 'Item 1' },
    { id: '2', content: 'Item 2' },
    { id: '3', content: 'Item 3' },
  ],
  list2: [
    { id: '4', content: 'Item 4' },
    { id: '5', content: 'Item 5' },
    { id: '6', content: 'Item 6' },
  ],
  list3: [
    { id: '7', content: 'Item 4' },
    { id: '8', content: 'Item 5' },
  ],
};

const QueriesCompDemo = ({ QuoteModalHandler, previewModalHand, toggleRightCanvas }) => {
  const { $instantActiveTab, searchForm } = useSelector((state) => state?.instantRate);
  const [items, setItems] = useState(initialItems);
  const navigate = useNavigate();

  const onDragEnd = (result) => {

    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const updatedList = Array.from(items[source.droppableId]);
      const [movedItem] = updatedList.splice(source.index, 1);
      updatedList.splice(destination.index, 0, movedItem);

      setItems((prevLists) => ({
        ...prevLists,
        [source.droppableId]: updatedList,
      }));
    }
    else {
      const sourceList = Array.from(items[source.droppableId]);
      const destinationList = Array.from(items[destination.droppableId]);
      const [movedItem] = sourceList.splice(source.index, 1);
      destinationList.splice(destination.index, 0, movedItem);

      setItems((prevLists) => ({
        ...prevLists,
        [source.droppableId]: sourceList,
        [destination.droppableId]: destinationList,
      }));
    }
  };

  return (
    <>
      <div className=" mb-5">
        <div className=" freight_filter_wrap d-flex align-items-center">
          <div className="label flex-grow-1 ">
          </div>
          <div className="right_actions_wrap flex-shrink-0 d-flex align-items-center">
            <div className="search_form">
              <form>
                <div className="position-relative">
                  <input type="search" className="form-control" placeholder="Search" value="" />
                  <button className="btn" type="button"><i className="bx bx-search-alt-2 align-middle"></i></button>
                </div>
              </form>
            </div>
            <div className="filter_wrap">
              <button className="bg-transparent">
                <img src={filter_icon} onClick={toggleRightCanvas} alt="filter" /></button></div><div className="upload_wrap">
            </div>
            <div className="add_btn">
              <button className="border-0" onClick={() => { navigate('/instant-rate/search-rate'); dispatch({ type: SEARCH_QUOTATION_BLANK }); dispatch({ type: QUOTATION_RESULT_SELECTED_BLANK }); }}><i className="bx bx-plus align-middle"></i> Create</button>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between mobScreen">
          <div
            className="card mb-4 innerbox2"
            style={{ backgroundColor: '#7239EA0A', borderRadius: '26px', marginTop: '10px', }}>
            <div className="d-flex align-items-center circlebox">
              <div className="circle-container">
                <div className="circle percentage-60">
                  <span>60%</span>
                  <div className="percentage-bar"></div>
                </div>
              </div>
              <h3 className="mb-0 ms-4 fs-6">
                In Progress <span>(25/75)</span>
              </h3>
            </div>
          </div>

          <div
            className="card mb-4 innerbox2" style={{ backgroundColor: '#EA83390A', borderRadius: '26px', marginTop: '10px' }}>
            <div className="d-flex align-items-center circlebox">
              <div className="circle1-container">
                <div className="circle1 percentage-40">
                  <span>60%</span>
                  <div className="percentage-bar"></div>
                </div>
              </div>
              <h3 className="mb-0 ms-4 fs-6">
                Lost <span>(25/75)</span>
              </h3>
            </div>
          </div>

          <div className="card mb-4 innerbox2" style={{ backgroundColor: '#22C55E0A', borderRadius: '26px', marginTop: '10px', }}>
            <div className="d-flex align-items-center circlebox">
              <div className="circle2-container">
                <div className="circle2 percentage-60">
                  <span>60%</span>
                  <div className="percentage-bar"></div>
                </div>
              </div>
              <h3 className="mb-0 ms-4 fs-6">
                Won <span>(25/75)</span>
              </h3>
            </div>
          </div>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          {Object.keys(items).map((listKey) => (
            <Droppable droppableId={listKey} key={listKey}>
              {(provided) => (
                <div
                  className="  mt-0 d-flex" style={{ paddingTop: '16px', float: 'left', width:"33%" }}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <div className="row col-md-1 col-lg-12  Norow-cols-md-2 Norow-cols-lg-3 g-4 colBoxMain">
                    <div className="col mainCol">
                      {items[listKey].map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided) => (
                            <div
                              className="col colBox"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{ ...provided.draggableProps.style }}
                            >
                              <div
                                className="card h-100 px-2"
                                style={{ userSelect: 'none', backgroundColor: '#ffffff', borderRadius: '10px', border: '1px solid #ccc' }}
                              >
                                <div className="card-header d-flex justify-content-between align-items-center">
                                  <div className="d-flex align-items-center">
                                    <img src={drag} alt="profile" className="profile1" />
                                    <p className="mb-0 rounded px-2 py-1 ms-2 custom-text text-primary">
                                      {item.id} BLRFC2923001
                                    </p>
                                  </div>
                                  <div className="d-flex align-items-center">
                                    <p className="mb-0">12/01/2024</p>
                                  </div>
                                </div>
                                <div className='p-2'>
                                  <div className="d-flex justify-content-between">
                                    <ul className="list-unstyled method1">
                                      <li>Customer</li>
                                      <li>Origin</li>
                                      <li>Destination</li>
                                      <li>Quote Value</li>
                                      <li>Status</li>
                                      <li>Last Update</li>
                                    </ul>
                                    <ul className="list-unstyled text-end method2">
                                      <li>Apex Exports Pvt Ltd</li>
                                      <li>INMAA</li>
                                      <li>BDDAC</li>
                                      <li>1,00,450.00</li>
                                      <li>Status1</li>
                                      <li>28/02/2024</li>
                                    </ul>
                                  </div>
                                </div>
                                <div className="card-footer p-1 pt-2 d-flex justify-content-between align-items-center">
                                  <div className="d-flex align-items-center">
                                    <img src={man2} alt="profile" className="profile" />
                                    <p className="mb-0">Tanmoy Karnakar</p>
                                  </div>
                                  <div className="d-flex align-items-center">
                                    <img src={clock} alt="profile" onClick={previewModalHand} className="profile1" />
                                    <img src={open_eye} onClick={() => QuoteModalHandler('view', item)} alt="profile" className="profile1" />
                                    <img src={edit} onClick={() => QuoteModalHandler('edit', item)} alt="profile" className="profile1" />
                                  </div>
                                </div>

                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </div>
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </>
  );
}
export default QueriesCompDemo;