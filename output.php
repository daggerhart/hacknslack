<!DOCTYPE html>

<html>
<head>
    <title>Page Title</title>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script src="data.js"></script>
    <script src="functions.js"></script>

    <script type="text/javascript">
        /*/ not sure if we need jquery yet
         $(document).ready(function(){

         });
         */
    </script>

</head>

<body>
<form id="slack" action="" method="post">
    /hack :
    <input type="text" name="command" value="" size="60" />
    <input type="submit" value="Submit" />

</form>

<?php
  if ($hack) {
    print $hack->display_output();
  }
?>
</body>
</html>