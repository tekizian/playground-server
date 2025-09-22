import * as z from "zod";

const TodoItemSchema = z.object({
  id: z.string(),
  text: z.string().nonempty(),
  isChecked: z.boolean(),
});

export const TodoItemCreateSchema = mapKeysToCols(TodoItemSchema);

export const TodoItemUpdateSchema = mapKeysToCols(
  TodoItemSchema.partial().required({
    id: true,
  })
);

function mapKeysToCols(schema) {
  return schema.transform(({ isChecked, ...validated }) => ({
    // Map the keys to match the db column names
    ...validated,
    completed: isChecked,
  }));
}
