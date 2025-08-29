import React from "react";
import DeleteSectionButton from "../atom/DeleteSectionButton.jsx";
import SectionButton from "../atom/SectionButton.jsx";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const SectionList = ({ secciones, selectedId, onSelectSection, onDeleteSection, onDragEnd }) => {
  return (
    <div className="flex flex-col w-64 bg-white rounded-lg shadow-md p-4 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-orange-400 scrollbar-track-orange-100">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="sections">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {secciones.map((section, index) => (
                <Draggable key={section.id} draggableId={section.id.toString()} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="flex items-center gap-2"
                    >
                      <SectionButton
                        label={section.titulo || section.label}
                        selected={selectedId === section.id}
                        onClick={() => onSelectSection(section.id)}
                      />
                      <DeleteSectionButton onClick={() => onDeleteSection(index)} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default SectionList;
