import { getAllCategories } from '@/sanity/lib/client';
import React from 'react'

const HeaderCategorySelector = async () => {

    const categories = await getAllCategories();
  return (
    <div>HeaderCategorySelector</div>
  )
}

export default HeaderCategorySelector
