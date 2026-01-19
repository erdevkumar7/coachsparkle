"use client";
import { useState } from "react";

export default function MultipleSelectChip({ value = [], onChange, max = null }) {
  const [inputValue, setInputValue] = useState("");

  const addTag = (tag) => {
    tag = tag.trim();
    if (!tag) return;

    // Prevent duplicates
    if (value.includes(tag)) return;

    // Optional limit for free users
    if (max && value.length >= max) return;

    onChange([...value, tag]);
  };

  const removeTag = (tag) => {
    onChange(value.filter((v) => v !== tag));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(inputValue);
      setInputValue("");
    }
  };

  const handleBlur = () => {
    // Add on blur for UX
    if (inputValue.trim()) {
      addTag(inputValue);
      setInputValue("");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "6px",
        padding: "6px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        minHeight: "45px",
      }}
    >
      {value.map((tag, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            background: "#eaeaea",
            padding: "4px 8px",
            borderRadius: "5px",
            fontSize: "14px",
          }}
        >
          {tag}
          <span
            onClick={() => removeTag(tag)}
            style={{
              marginLeft: 6,
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            ×
          </span>
        </div>
      ))}

      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        placeholder="Type & Enter..."
        style={{
          border: "none",
          outline: "none",
          flexGrow: 1,
          width: "870px",
          minWidth: "600px",
          fontSize: "14px",
        }}
      />
    </div>
  );
}
