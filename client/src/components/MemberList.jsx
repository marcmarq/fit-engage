import React from "react";

const MemberList = ({ members, handleEdit, handleDelete }) => {
  return (
    <div>
      {members.map((member, index) => (
        <div key={index} className="border p-4 mb-2 rounded-md">
          {Object.entries(member).map(([key, value]) => (
            <p key={key}><strong>{key.replace(/([A-Z])/g, " $1")}:</strong> {value}</p>
          ))}
          <button onClick={() => handleEdit(member)} className="bg-yellow-500 text-white py-1 px-4 rounded-md mr-2">
            Edit
          </button>
          <button onClick={() => handleDelete(member)} className="bg-red-500 text-white py-1 px-4 rounded-md">
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default MemberList;

