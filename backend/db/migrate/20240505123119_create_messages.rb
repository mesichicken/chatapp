class CreateMessages < ActiveRecord::Migration[7.0]
  def change
    create_table :messages do |t|
      t.text :content
      t.string :sender_name
      t.references :room, null: false, foreign_key: true

      t.timestamps
    end
  end
end
