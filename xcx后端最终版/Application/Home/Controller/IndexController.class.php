<?php
namespace Home\Controller;
use Think\Controller;
use Home\Model\MessageViewModel;
use Home\Model\UserViewModel;
use Home\Model\TestViewModel;
use Think\Model;
class IndexController extends Controller {

	
    public function index()
    {
        $model = new MessageViewModel();
        $cont = $model -> select();
        $this->ajaxReturn($cont); 
    }

    public function init()
    {
    	$user_id = I('user_id');
    	$nickname = I('nickname');
    	$created_tm = date("Y-m-d H:i:s");
    	$model = new Model('User');
    	$data = array('user_id'=> $user_id,
    		'nickname' => $nickname,
    		'created_tm' => $created_tm,
    		'call_num' => '@',
    		'call_name' => '@' 
       
        );
      if(!($user_id == ''))
      {
        if (!($model->create($data) && $model->add()))
        {
            echo  '欢迎回来！';
        }
        else 
        	echo  '欢迎加入！';
      }

    }

    public function initcall()
    {/*
      $user_id = I('openid');
      $call_num = I('call_num');
      $call_name = I('call_name');
      $model = new Model('User');
      $data  = array('call_name' =>$call_name,'call_num' => $call_num );
     if (!($model->where("user_id=$user_id")->setField($data)))
        {
            echo "添加失败";
        }
        else 
          echo "添加成功";*/
          /* $model = new Model('User');
        $cont = $model -> select();
        $this->ajaxReturn($cont); */
      $user_id = I('openid');
      $call_num = I('call_num');
      $call_name = I('call_name');
       if(preg_match('#^13[\d]{9}$|^14[5,7]{1}\d{8}$|^15[^4]{1}\d{8}$|^17[0,3,6,7,8]{1}\d{8}$|^18[\d]{9}$#', $call_num) ? true : false){   

          $con=mysqli_connect("localhost","root","","xcx");
          mysqli_query($con,"UPDATE xcx_user SET call_num='$call_num'
          WHERE user_id='$user_id '");
          mysqli_query($con,"UPDATE xcx_user SET call_name='$call_name'
          WHERE user_id='$user_id' ");
          echo '1';
          mysqli_close($con);
        // oUQgn0dRtgtdk4SSVw5BZt4BCiBY

      }else{  
          echo "0";  
      }  


    }
    public function callback()
    {
        $user_id = I('openid');
        $con=mysqli_connect("localhost","root","","xcx");
        $sql = "SELECT *FROM xcx_user WHERE user_id='$user_id'";
		$result = mysqli_query($con, $sql);
		while($row = mysqli_fetch_assoc($result)) {
				if($row['call_num']=='@')
		    		{ $back = array('0', null,null);
		        $this->ajaxReturn($back);
		    	}
		        else
		        	{ $back = array('1', $row["call_name"],$row["call_num"]);
		        $this->ajaxReturn($back);
		    	}
			

    	
    }
        //$model = new Model('User');
        //$data = $model -> where("user_id='$user_id'")->select();
        //$back = array($data[0]['call_name'], $data[0]['call_num']);
    	//$this->ajaxReturn($data);
        /*if(isset($data['0']['call_num']))
        	{ $back = array('1', $data['0']['call_name'],$data['0']['call_num']);
        $this->ajaxReturn($back);
    	}
        else
        	{ $back = array('0', null,null);
        $this->ajaxReturn($back);
    	}*/

    }
    public function dcall()
    {
    	$user_id =  I('user_id');
    	$con=mysqli_connect("localhost","root","","xcx");
        mysqli_query($con,"UPDATE xcx_user SET call_num= '@'
          WHERE user_id='$user_id'");
          mysqli_query($con,"UPDATE xcx_user SET call_name= '@'
          WHERE user_id='$user_id'");
          mysqli_close($con);
 			echo '1';
    }

   public function upload(){ 
       if(I('box_num')=='') {$box_num = '7';}
        else{$box_num = I('box_num');}
        $mark = '0';
       $message_name = I('message_name');
       $content = I('content');
       $created_tm = date("Y-m-d H:i:s");
       $take = I('timer');
       $clock_tm = I('timer');
       $light = I('light');
       $user_id = I('openid');
	   $upload = new \Think\Upload(); // 实例化上传类
	   $upload->exts = array('jpg', 'bmp', 'gif', 'png', 'jpeg'); // 设置附件上传类型
	   $upload->savename = array('randname' ,'6' );
	   $upload->maxsize = 2024000;//图片上传
	   $upload->rootpath = './Uploads/'; // 设置附件上传目录
	   $upload->savepath = '';
	   $info = $upload->uploadOne($_FILES['file']);
	   if (!$info)
	    {// 上传错误提示错误信息
	      echo '0';
	   }
	   if($message_name == ''||$box_num == '7')
	   {
	   	echo '0';
	   } 
	   else 
	   {// 上传成功
	     $baesURL = 'Uploads/'.$info['savepath'].$info['savename'];
	     $pic_url = $baesURL;
	     $model = new Model('Message');
         $data = array(
            'message_name' => $message_name,
            'content' => $content,
            'pic_url' => $pic_url,
            'box_num' => $box_num,
            'take' => $take,
            'mark' => $mark,
            'created_tm' => $created_tm,
            'clock_tm' => $clock_tm,
            'light' => $light,
            'user_id' => $user_id
        );
        if (!($model->create($data) && $model->add()))
        {
            echo '0';
        }
        else 

       		echo '1';
	    

	   }
     
   }

   public function delete()
   {
   	$user_id = I('user_id');
   	$message_id = I('message_id');
   	$model = new Model('Message');
   	if(!($model->where("user_id=$user_id")->delete("$message_id")))
   	{
   		echo '0';
   	}
   	else
   	    echo '1';
   }

	public function alter()
	{
     if(I('box_num')==''){$box_num = '7';}
        else{$box_num = I('box_num');}
        $mark = '0';
     $take = I('timer');
		 $user_id = I('user_id');
		 $message_id = I('message_id');
		 $message_name = I('message_name');
   		$content = I('content');
    	$clock_tm = I('timer');
    	$light = I('light');
    	$created_tm = date("Y-m-d H:i:s");
	   // $model->where("message_id=$message_id")->save($data);

	   $upload = new \Think\Upload(); // 实例化上传类
	   $upload->exts = array('jpg', 'bmp', 'gif', 'png', 'jpeg'); // 设置附件上传类型
	   $upload->savename = array('randname' ,'6' );
	   $upload->maxsize = 2024000;//图片上传
	   $upload->rootpath = './Uploads/'; // 设置附件上传目录
	   $upload->savepath = '';
	   $info = $upload->uploadOne($_FILES['file']);
	   if (!$info)
	    {// 上传错误提示错误信息
	      echo '0';
	   }
	   if($message_name == ''||$box_num == '7') 
	   {
	   	 echo '0';
	   }
	   else 
	   {// 上传成功
	     $baesURL = 'Uploads/'.$info['savepath'].$info['savename'];
	     $pic_url = $baesURL;

	     $model = new Model('Message');
         $data = array(
            'message_name' => $message_name,
            'content' => $content,
            'pic_url' => $pic_url,
            'created_tm' => $created_tm,
            'box_num' => $box_num,
            'take' => $take,
            'mark' => $mark,
            'clock_tm' => $clock_tm,
            'light' => $light,
            'user_id' => $user_id
        );
        if (!($model->where("user_id=$user_id")->where("message_id=$message_id")->save($data)))
        {
            echo '0';
        }
        else 
       		echo '1';
	    

	   }
     
	}

	public function receive()
	{
    $box_num = I('box_num');
    if($box_num == '1')
    {
      $model = new Model('Message');
      $data = array('mark' => '1', );
      $count1 = $model -> where('box_num=1')->order('message_id desc')->find();
      $model->where("message_id= $count1[message_id]")->setField('mark','1');
     
    }
    if($box_num == '2')
    {
      $model = new Model('Message');
      $data = array('mark' => '1', );
      $count1 = $model -> where('box_num=2')->order('message_id desc')->find();
      $model->where("message_id= $count1[message_id]")->setField('mark','1');
    }
		    
	}
	public function back()
	{
      
      $model = new Model('Message');
      $count1 = $model -> where('box_num=1')->order('message_id desc')->find();
      $count2 = $model -> where('box_num=2')->order('message_id desc')->find();
      echo (substr($count1['clock_tm'],0,2).substr($count1['clock_tm'],3,2).'1'.substr($count2['clock_tm'],0,2).substr($count2['clock_tm'],3,2).'2');
   
    
	}

	public function test()
	{
		$one = '0';
		$two = '0';
		$one = I('humidity');
		$two = I('temperature');
		$time =  date("H:i:s");
		$model = new Model('Test');
		$data  = array('one' =>$one ,'two'=>$two , 'time' => $time);
		if (!($model->create($data) && $model->add()))
        {
            echo '0';
        }
        else 
       		{
            $cont = $model -> select();
          $this->ajaxReturn($cont); 
          }
	    

	 }

	


}