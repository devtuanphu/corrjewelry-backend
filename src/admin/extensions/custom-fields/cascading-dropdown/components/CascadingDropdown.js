// src/admin/extensions/custom-fields/cascading-dropdown/components/CascadingDropdown.js
import React, { useState, useEffect } from "react";
import { Select, Option } from "@strapi/design-system/Select";
import axios from "axios";

const CascadingDropdown = ({ name, onChange, value }) => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [details, setDetails] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  // Các danh mục cha cố định
  const categoryOptions = [
    { id: "nam", title: "NAM" },
    { id: "nu", title: "NỮ" },
    { id: "bo_su_tap", title: "BỘ SƯU TẬP" },
  ];

  // Lấy danh mục con khi chọn danh mục cha
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    axios
      .get(`http://localhost:1338/${e.target.value}`)
      .then((res) => setSubcategories(res.data.danh_muc_con))
      .catch((err) => console.error(err));
  };

  // Lấy danh mục chi tiết khi chọn danh mục con
  const handleSubcategoryChange = (e) => {
    setSelectedSubcategory(e.target.value);
    const selectedSubcategory = subcategories.find(
      (sub) => sub.id === e.target.value
    );
    setDetails(selectedSubcategory.danh_muc_chi_tiet);
  };

  // Khi người dùng chọn danh mục chi tiết
  const handleDetailChange = (e) => {
    onChange({ target: { name, value: e.target.value } });
  };

  return (
    <div>
      {/* Dropdown cho danh mục cha */}
      <Select
        label="Choose Category"
        name={name}
        onChange={handleCategoryChange}
        value={value.category}
      >
        {categoryOptions.map((category) => (
          <Option key={category.id} value={category.id}>
            {category.title}
          </Option>
        ))}
      </Select>

      {/* Dropdown cho danh mục con */}
      {selectedCategory && (
        <Select
          label="Choose Subcategory"
          onChange={handleSubcategoryChange}
          value={value.subcategory}
        >
          {subcategories.map((subcategory) => (
            <Option key={subcategory.id} value={subcategory.id}>
              {subcategory.title}
            </Option>
          ))}
        </Select>
      )}

      {/* Dropdown cho danh mục chi tiết */}
      {selectedSubcategory && (
        <Select
          label="Choose Detail"
          onChange={handleDetailChange}
          value={value.detailcategory}
        >
          {details.map((detail) => (
            <Option key={detail.id} value={detail.id}>
              {detail.title}
            </Option>
          ))}
        </Select>
      )}
    </div>
  );
};

export default CascadingDropdown;
