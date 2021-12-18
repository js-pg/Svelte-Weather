<script>
    const fetchMain = (async (url) => {
        const response = await fetch("http://api.openweathermap.org/data/2.5/weather?q=dallas&appid=7af0645f81d36888c9fca585b6611eb4");
        return await response.json();
    })();
</script>
