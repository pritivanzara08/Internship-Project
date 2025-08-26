import React from "react";
import CategorySection from "@/components/sections/CategorySection";

const Categories = () => {
  return (
    <div className="categories-container">
      <CategorySection categoryId="photoframes" title="Photo Frames" />
      <CategorySection categoryId="hampers" title="Gift Hampers" />
      <CategorySection categoryId="birthdayitems" title="Birthday Gifts" />
      <CategorySection categoryId="anniversaryitems" title="Anniversary Gifts" />
      <CategorySection categoryId="festiveitems" title="Festive Items" />
      <CategorySection categoryId="leditems" title="LED Items" />
      <CategorySection categoryId="art" title="Resin Arts" />
    </div>
  );
};

export default Categories;