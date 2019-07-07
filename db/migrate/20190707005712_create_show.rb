class CreateShow < ActiveRecord::Migration[5.2]
  def change
    create_table :shows do |t|
      t.string :name, null: false
      t.datetime :start_time, null: false
      t.integer :duration, null: false
      t.text :description

      t.timestamps null: false
    end
  end
end
