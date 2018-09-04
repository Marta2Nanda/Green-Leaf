    function registerUser(){

        $.ajax({

            url: "/api/register",
            type:"post",
            data:$("#registration").serialize(),
            success:function(res){
                $('#successModal').modal('show');
                $("#registration")[0].reset();
                setTimeout(	function() { redirect: window.location.replace("http://localhost:8080/");	}, 2000);
            },
            error:function(xhr, status, error){
            	$('#errorModal').modal('show');
            	$("#registration")[0].reset();
                }
           });
        }
    
    function loginUser(){
    	
        $.ajax({

            url: "/api/login",
            type:"post",
            data:$("#login").serialize(),
            dataType: 'json',
            success:function(data){
            	var userType = data[0].user_type;
                $('#loginSuccessModal').modal('show');
                $("#login")[0].reset();
                if(userType=="user"){
                	sessionStorage.setItem("user_email",data[0].user_email);
                	sessionStorage.setItem("user_name",data[0].user_name);
                	sessionStorage.setItem("session_id",generateSessionId());
                	setTimeout(	function() { redirect: window.location.replace("http://localhost:8080/user");	}, 2000);
                } 
                if(userType=="admin") {
                	sessionStorage.setItem("session_id",generateSessionId());
                	sessionStorage.setItem("user_name",data[0].user_name);
                	setTimeout(	function() { redirect: window.location.replace("http://localhost:8080/admin");	}, 2000);
                }
            },
            error:function(xhr, status, error){
            	$('#errorModalLogin').modal('show');
            	$("#login")[0].reset();
                }
           });
        }
    
    function generateSessionId() {
        var id ="_" + new Date().valueOf() + Math.random().toFixed(16).substring(2);
        return id;
    }