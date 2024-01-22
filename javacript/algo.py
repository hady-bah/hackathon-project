import re
import json


# Define regular expressions to extract relevant information
course_pattern = re.compile(r'\b([A-Z]+\s*\d+)\s+([\w\s]+)\s+(\d+\.\d+)\s+([A-F][\+\-]?)')
contact_hours_pattern = re.compile(r'Contact Hours:\s+(\d+\.\d+)')
grade_pattern = re.compile(r'Term GPA:\s+(\d+\.\d+)')

# Find all matches in the text
course_matches = course_pattern.findall(text)
contact_hours_matches = contact_hours_pattern.findall(text)
grade_matches = grade_pattern.findall(text)

# Create a list to store course information
courses = []

# Iterate through the matches and append the extracted information to the list
for i, match in enumerate(course_matches):
    course_code, course_name, credit_hours, grade = match
    contact_hours_value = float(contact_hours_matches[i])

    course_info = {
        "Course Code": course_code,
        "Course Name": course_name,
        "Credit Hours": credit_hours,
        "Contact Hours": contact_hours_value,
        "Grade": grade
    }

    courses.append(course_info)

# Write the list of courses to a JSON file
with open('courses.json', 'w') as json_file:
    json.dump(courses, json_file, indent=2)

print("Data written to courses.json")
