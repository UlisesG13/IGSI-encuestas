import React, { useState } from "react";
import DeleteSectionButton from "../atom/DeleteSectionButton.jsx";
import SectionButton from "../atom/SectionButton.jsx";
import AddSectionButton from "../atom/AddSectionButton";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const initialSections = [
  { id: "1", label: "Datos personales" },
  { id: "2", label: "Datos Escolares" },
  { id: "3", label: "Datos Informales" },
];

const SectionList = () => {
  const [sections, setSections] = useState(initialSections);
  const [selectedId, setSelectedId] = useState("1");

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(sections);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setSections(reordered);
  };

  const handleAddSection = () => {
    const newId = (sections.length + 1).toString();
    setSections([...sections, { id: newId, label: `Nueva sección ${newId}` }]);
  };

  const handleDeleteSection = (id) => {
    setSections(sections.filter(section => section.id !== id));
    if (selectedId === id && sections.length > 1) {
      setSelectedId(sections[0].id);
    }
  };

  return (
    <div className="flex flex-col w-64 bg-white rounded-lg shadow-md p-4 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-orange-400 scrollbar-track-orange-100">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="sections">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {sections.map((section, index) => (
                <Draggable key={section.id} draggableId={section.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="flex items-center gap-2"
                    >
                      <SectionButton
                        label={section.label}
                        selected={selectedId === section.id}
                        onClick={() => setSelectedId(section.id)}
                      />
                      <DeleteSectionButton onClick={() => handleDeleteSection(section.id)} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div className="my-4 flex justify-center">
        <AddSectionButton small onClick={handleAddSection} />
      </div>

      <AddSectionButton onClick={handleAddSection} />
    </div>
  );
};

export default SectionList;
