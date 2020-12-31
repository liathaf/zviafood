import { CountRecipePipe } from './count-recipe.pipe';

describe('CountRecipePipe', () => {
  it('create an instance', () => {
    const pipe = new CountRecipePipe();
    expect(pipe).toBeTruthy();
  });
});
