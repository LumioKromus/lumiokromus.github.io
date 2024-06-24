extends Node2D

var number = 0

func _on_button_pressed() -> void:
	number += 1
	$Label.text = str(number)
