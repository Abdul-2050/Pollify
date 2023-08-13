from selenium import webdriver
from bs4 import BeautifulSoup
import time

def get_live_values(url):
    # Configure the headless browser
    options = webdriver.ChromeOptions()
    options.add_argument('--headless')
    options.add_argument('--disable-gpu')
    driver = webdriver.Chrome(options=options)  # Replace 'Chrome' with 'Firefox' if using Firefox

    try:
        driver.get(url)
        time.sleep(5)  # Wait for the page to load (you may need to adjust the time based on your internet speed)

        # Extract the HTML content of the page after it has loaded (including updated dynamic content)
        html_content = driver.page_source

        # Close the headless browser
        driver.quit()

        # Parse the HTML content using BeautifulSoup
        soup = BeautifulSoup(html_content, 'html.parser')

        # Find the elements containing the required information
        months_element = soup.find('span', class_='js-month')
        days_element = soup.find('span', class_='js-day')
        hours_element = soup.find('span', class_='js-hour')

        # Extract the text from the elements
        months = months_element.text.strip() if months_element else None
        days = days_element.text.strip() if days_element else None
        hours = hours_element.text.strip() if hours_element else None

        return months, days, hours

    except Exception as e:
        print(f"Error occurred: {e}")
        driver.quit()
        return None, None, None

if __name__ == "__main__":
    # Replace 'https://example.com' with the URL of the website containing the HTML snippet
    target_url = 'https://www.cricketworldcup.com/'

    # Call the function to get the live values
    months, days, hours = get_live_values(target_url)

    # Print the extracted values
    print("Months:", months)
    print("Days:", days)
    print("Hours:", hours)
