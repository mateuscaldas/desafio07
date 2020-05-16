import { getRepository } from 'typeorm';

import Category from '../models/Category';

class CreateCategoryService {
  public async execute(title: string): Promise<Category> {
    const categoryRepository = getRepository(Category);

    let categoryExists = await categoryRepository.findOne({
      where: { title },
    });

    if (!categoryExists) {
      categoryExists = categoryRepository.create({ title });
    }

    await categoryRepository.save(categoryExists);

    return categoryExists;
  }
}

export default CreateCategoryService;
